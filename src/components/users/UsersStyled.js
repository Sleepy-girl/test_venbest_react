import styled from "styled-components";

export const UsersStyles = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 50px;

  th {
    font-size: 16px;
    font-weight: 400;
    line-height: 48px;
    color: white;
    background: cornflowerblue;
    padding: 0 24px;
    margin-right: 1px;
  }
  th,
  tr {
    min-width: auto;
  }
  .number {
    border-top-left-radius: 8px;
  }
  .sex {
    border-top-right-radius: 8px;
  }
  .id,
  .gender,
  .clicks,
  .views {
    /* flex-grow: 110;
     */
  }
  .email {
    /* flex-grow: 50; */
  }
`;
