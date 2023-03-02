import axios from "axios";
import React, { useEffect, useState } from "react";

import { Audio } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import { colors } from "../../../common/theme";

import { LoadingContainer } from "../../../common/style";
import { API_ROOT_URL } from "../../../constants";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleDot,
  faCode,
  faCodeBranch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const RepoDetail = () => {
  const { owner, repo } = useParams();

  const [currentRepo, setCurrentRepo] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchRepo = async () => {
      try {
        const response = await axios.get(
          `${API_ROOT_URL}/repos/${owner}/${repo}`
        );
        setCurrentRepo(response?.data);
      } catch (err) {
        setError(err?.response?.data?.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRepo();
  }, [owner, repo]);

  const formattedName = currentRepo?.name.split("-").join(" ");
  const formattedAuthor = currentRepo?.owner?.login.split("-").join(" ");

  if (loading)
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

  if (error)
    return (
      <div
        style={{
          fontSize: 28,
          color: colors.secondary,
        }}
      >
        {error}! Please try again.
      </div>
    );

  return (
    <RepoDetails>
      <a
        className="name"
        href={`${currentRepo.html_url}`}
        target="_blank"
        rel="noreferrer"
      >
        <FontAwesomeIcon icon={faCode} />
        {formattedName.charAt(0).toUpperCase() + formattedName.slice(1)}
      </a>
      <a
        className="author"
        href={`${currentRepo?.owner?.html_url}`}
        target="_blank"
        rel="noreferrer"
      >
        <FontAwesomeIcon icon={faUser} />
        {formattedAuthor.charAt(0).toUpperCase() + formattedAuthor.slice(1)}
      </a>
      <p className="issues">
        <FontAwesomeIcon icon={faCircleDot} />
        {currentRepo.open_issues_count} open issues
      </p>
      <p className="branch">
        <FontAwesomeIcon icon={faCodeBranch} /> Default branch -
        {` ${currentRepo.default_branch}`}
      </p>
    </RepoDetails>
  );
};

const RepoDetails = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.4);
  padding: 40px;
  border-radius: 5px;
  font-size: 18px;
  & > a {
    display: flex;
    align-items: center;
    cursor: pointer;
    color: ${colors.secondary};
    text-decoration: underline;
  }
  svg {
    margin-right: 15px;
    &.link {
      margin-left: 5px;
      font-size: 15px;
    }
  }
  & > .author {
    margin-top: 20px;
  }
  & > p {
    margin-bottom: 0;
    margin-top: 20px;
  }
`;

export default RepoDetail;
