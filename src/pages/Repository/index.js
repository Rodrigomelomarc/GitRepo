import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import PropTypes from 'prop-types';

import { FaSpinner, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Container from '../../components/Container';
import {
  Loading,
  Owner,
  IssuesList,
  IssuesFilter,
  FilterButton,
  Pagination,
  BackButton,
  FowardButton,
} from './styles';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    issues: [],
    repoName: '',
    filter: '',
    currentPage: 0,
    loading: true,
    loadingIssues: false,
  };

  async componentDidMount() {
    const { match } = this.props;

    const repoName = decodeURIComponent(match.params.repository);
    const page = 1;
    const filter = 'all';

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: filter,
          per_page: 5,
          page: page,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
      repoName: repoName,
      currentPage: page,
      filter: filter,
    });
  }

  handleFilter = async filter => {
    this.setState({ loadingIssues: true });
    const { repoName } = this.state;

    const filteredIssues = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state: filter,
        per_page: 5,
        page: 1,
      },
    });

    this.setState({
      issues: filteredIssues.data,
      loadingIssues: false,
      currentPage: 1,
      filter: filter,
    });
  };

  handlePagination = async operation => {
    const { currentPage, filter, repoName } = this.state;
    this.setState({ loadingIssues: true });

    let nextPage;

    if (operation === 'add') {
      nextPage = currentPage + 1;
    } else if (operation === 'sub') {
      nextPage = currentPage - 1;
    }

    const filteredIssues = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state: filter,
        per_page: 5,
        page: nextPage,
      },
    });

    this.setState({
      loadingIssues: false,
      currentPage: nextPage,
      issues: filteredIssues.data,
    });
  };

  render() {
    const {
      loading,
      repository,
      issues,
      loadingIssues,
      currentPage,
    } = this.state;

    if (loading) {
      return <Loading>Carregando</Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <IssuesFilter>
          <strong>Filter:</strong>
          <li>
            <FilterButton autoFocus onClick={() => this.handleFilter('all')}>
              All
            </FilterButton>
          </li>
          <li>
            <FilterButton onClick={() => this.handleFilter('open')}>
              Open
            </FilterButton>
          </li>
          <li>
            <FilterButton onClick={() => this.handleFilter('closed')}>
              Closed
            </FilterButton>
          </li>
        </IssuesFilter>

        <IssuesList loading={loadingIssues}>
          {loadingIssues ? (
            <FaSpinner size={30} color="#333" />
          ) : (
            issues.map(issue => (
              <li key={String(issue.id)}>
                <img src={issue.user.avatar_url} alt={issue.user.login} />
                <div>
                  <strong>
                    <a href={issue.html_url}>{issue.title}</a>
                    {issue.labels.map(label => (
                      <span key={String(label.id)}>{label.name}</span>
                    ))}
                  </strong>
                  <p>{issue.user.login}</p>
                </div>
              </li>
            ))
          )}
        </IssuesList>

        <Pagination>
          <BackButton
            page={currentPage}
            onClick={() => this.handlePagination('sub')}
          >
            <FaChevronLeft size={20} color="#7159c1" />
          </BackButton>
          <FowardButton onClick={() => this.handlePagination('add')}>
            <FaChevronRight size={20} color="#7159c1" />
          </FowardButton>
        </Pagination>
      </Container>
    );
  }
}
