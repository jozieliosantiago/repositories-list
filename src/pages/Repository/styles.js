import styled, { keyframes, css } from 'styled-components';

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

  a {
    color: #7159c1;
    font-size: 16px;
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
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;

export const IssueList = styled.ul`
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    border: solid 1px #eee;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: solid 2px #eee;
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
            color: #7159c1;
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

      p {
        margin-top: 5px;
        font-size: 12px;
        color: #999;
      }
    }
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg)
  } to {
    transform: rotate(360deg)
  }
`;

export const Loader = styled.div`
  width: 100%;
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;

  ${(props) =>
    props.loadingIssues &&
    css`
      svg {
        animation: ${rotate} 1s linear infinite;
      }
    `};
`;

export const Filter = styled.div`
  margin-bottom: 20px;
  margin-top: 30px;
  padding-top: 30px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  border-top: solid 1px #eee;

  label {
    margin-bottom: 3px;
  }

  select {
    background: none;
    color: #7159c1;
    border: solid 1px #7159c1;
    padding: 2px 5px;
    border-radius: 3px;

    &[disabled] {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }
`;

export const Pagination = styled.div`
  width: 100%;
  display: flex;
  padding-top: 20px;
  justify-content: center;
  align-items: center;

  button {
    border: solid 1px #7159c1d6;
    color: #7159c1d6;
    padding: 5px;
    background: #fff;
    margin: 0 8px;
    border-radius: 5px;
    font-size: 0.9em;

    &[disabled] {
      cursor: not-allowed;
      color: #7159c159;
      border: solid 1px #7159c159;
    }
  }
`;
