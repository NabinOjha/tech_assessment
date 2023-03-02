import React from "react";

import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";

import { Audio } from "react-loader-spinner";
import { colors } from "../../common/theme";
import RepoListItem from "./RepoListtem";
import { loadRepos } from "../../redux/repos";
import { ITEMS_PER_PAGE } from "../../constants";
import { LoadingContainer } from "../../common/style";

const ReposList = () => {
  const dispatch = useDispatch();
  const repoState = useSelector((state) => state.repo);
  const repos = repoState.repos || [];

  const handlePageClick = (page) => {
    dispatch(
      loadRepos({
        query: repoState.query,
        sort: repoState.sort,
        order: repoState.order,
        page: page.selected,
      })
    );
  };

  if (repoState.loading) {
    return (
      <LoadingContainer>
        <Audio
          height="80"
          width="80"
          color={colors.primary}
          ariaLabel="loading"
          wrapperStyle
          wrapperClass
        />
      </LoadingContainer>
    );
  }

  if (!repos.length) {
    return (
      <ReposNotFound>
        Repositories not found. Please search in above search box.
      </ReposNotFound>
    );
  }

  return (
    <ReposListSection>
      {repos.map((repo) => {
        return (
          <RepoListItem
            key={repo.id}
            name={repo.name}
            author={repo.owner}
            openIssues={repo.open_issues_count}
            forks={repo.forks_count}
            watchers={repo.watchers}
            stars={repo.stargazers_count}
            updatedAt={repo.updated_at}
            description={repo.description}
          />
        );
      })}
      {repos.length && repoState.totalItems > ITEMS_PER_PAGE ? (
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={4}
          pageCount={
            Math.floor(repoState.totalItems / ITEMS_PER_PAGE) > 100
              ? 100
              : Math.floor(repoState.totalItems / ITEMS_PER_PAGE)
          }
          previousLabel="< Previous"
          renderOnZeroPageCount={null}
          containerClassName="repo-pagination"
          forcePage={repoState.page || 0}
        />
      ) : null}
    </ReposListSection>
  );
};

const ReposListSection = styled.ul`
    padding: 10px 0;
    .repo-pagination {
      display: flex;
      margin-top: 30px;

      li {
        display: inline-block;
        cursor: pointer;
        box-shadow: 0px 0px 1px 1px #ddd;
        cursor: pointer;
        min-width: 38px;
        height: 38px;

        & > a {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        &.selected {
          color: #fff;
          background: ${colors.secondary};
        }
      }

      .previous {
        margin-right: 10px;
        padding: 0 5px;
      }
      .next {
        margin-left: 10px;
        padding: 0 5px;
      }
      .disabled {
        opacity: 0.5;
      }
    }
  `,
  ReposNotFound = styled.h4`
    font-size: 20px;
    font-weight: 500;
    color: ${colors.secondary};
  `;

export default ReposList;
