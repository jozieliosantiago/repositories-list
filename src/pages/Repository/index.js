import React, { Component } from 'react';
import { FaSpinner } from 'react-icons/fa';

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../services/api';

import Container from '../../components/Container';
import {
  Loading,
  Owner,
  IssueList,
  Loader,
  Filter,
  Pagination,
} from './styles';

class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repoName: '',
    repository: {},
    issues: [],
    loading: true,
    loadingIssues: true,
    filter: 'open',
    page: 1,
  };

  async componentDidMount() {
    const { match } = this.props;
    const { filter, page } = this.state;

    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: filter,
          per_page: 5,
          page,
        },
      }),
    ]);

    this.setState({
      loading: false,
      loadingIssues: false,
      repository: repository.data,
      issues: issues.data,
      repoName,
    });
  }

  fetchIssues = async (page) => {
    this.setState({ loadingIssues: true });
    const { filter, repoName } = this.state;

    const issues = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state: filter,
        per_page: 5,
        page,
      },
    });

    this.setState({
      loadingIssues: false,
      issues: issues.data,
      page,
    });
  };

  handleSelect = (e) => {
    this.setState({
      filter: e.target.value,
    });
    this.fetchIssues(1);
  };

  handleNextPage = () => {
    const { page } = this.state;

    this.fetchIssues(page + 1);
  };

  handlePrevPage = () => {
    const { page } = this.state;

    if (page > 1) {
      this.fetchIssues(page - 1);
    }
  };

  render() {
    const { repository, issues, loading, loadingIssues, page } = this.state;

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

        <Filter>
          <label htmlFor="option">Filtros</label>
          <select
            id="option"
            onChange={this.handleSelect}
            disabled={loadingIssues}
          >
            <option value="open">Abertas</option>
            <option value="closed">Fechadas</option>
            <option value="all">Todas</option>
          </select>
        </Filter>

        {loadingIssues ? (
          <Loader loadingIssues>
            <FaSpinner size={30} color="#7159c1" />
          </Loader>
        ) : (
          <>
            <IssueList>
              {issues.map((issue) => (
                <li key={String(issue.id)}>
                  <img src={issue.user.avatar_url} alt={issue.user.login} />
                  <div>
                    <strong>
                      <a href={issue.html_url}>{issue.title}</a>
                      {issue.labels.map((label) => (
                        <span key={String(label.id)}>{label.name}</span>
                      ))}
                    </strong>
                    <p>{issue.user.login}</p>
                  </div>
                </li>
              ))}
            </IssueList>
          </>
        )}
        <Pagination>
          <button
            type="button"
            onClick={() => this.handlePrevPage()}
            disabled={page === 1 || loadingIssues}
          >
            Anterior
          </button>
          <button
            type="button"
            onClick={() => this.handleNextPage()}
            disabled={loadingIssues}
          >
            Próxima
          </button>
        </Pagination>
      </Container>
    );
  }
}

export default Repository;
