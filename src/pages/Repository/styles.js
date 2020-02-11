import styled, { css, keyframes } from 'styled-components';

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  a {
    font-size: 16px;
    color: #7159c1;
    text-decoration: none;
  }

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 15px;
    line-height: 1.4;
    max-width: 400px;
    color: #666;
    text-align: center;
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg)
  }
`;

export const IssuesList = styled.ul`
  padding-top: 30px;
  margin-top: 30px;
  border-top: 1px solid #eee;
  list-style: none;
  display: ${props => props.loading && 'flex'};
  align-items: ${props => props.loading && 'center'};
  justify-content: ${props => props.loading && 'center'};

  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid #eee;
    }

    div {
      flex: 1;
      margin-left: 15px;

      strong {
        font-size: 16px;

        a {
          text-decoration: none;
          color: #333;

          &:hover {
            color: #7153c1;
          }
        }

        span {
          background: #eee;
          color: #333;
          border-radius: 2px;
          font-size: 12px;
          font-weight: 600;
          height: 20px;
          padding: 3px 4px;
          margin-left: 10px;
        }
      }
    }

    p {
      margin-top: 5px;
      font-size: 12px;
      color: #999;
    }
  }
`;

export const IssuesFilter = styled.div`
  display: flex;
  list-style: none;
  margin-top: 30px;
  padding-top: 30px;
  border-top: 1px solid #eee;
  align-items: center;
  justify-content: space-around;

  strong {
    font-size: 16px;
    color: #333;
  }
`;

export const FilterButton = styled.button`
  width: 70px;
  height: 30px;
  background: #fff;
  color: #666;
  border: 1px solid #666;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:focus {
    border: 1px solid #7159c1;
    color: #7159c1;
  }
`;

export const Pagination = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const BackButton = styled.button.attrs(props => ({
  disabled: props.page === 1 ? true : false,
}))`
  width: 30px;
  height: 30px;
  background: #fff;
  border: 1px solid #7159c1;
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-right: 5px;

  &[disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const FowardButton = styled.button`
  width: 30px;
  height: 30px;
  background: #fff;
  border: 1px solid #7159c1;
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-left: 5px;
`;
