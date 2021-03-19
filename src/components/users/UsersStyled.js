import styled from "styled-components";

export const UsersStyles = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  padding-top: 50px;

  th {
    font-size: 16px;
    font-weight: 400;
    line-height: 44px;
    color: white;
    background: cornflowerblue;
    padding: 14px 24px;
    margin-right: 1px;
  }
  th,
  tr {
    min-width: auto;
  }
  th:first-of-type {
    border-top-left-radius: 8px;
  }
  th:last-of-type {
    border-top-right-radius: 8px;
  }
  input {
    outline: none;
    border: none;
    border-radius: 50pc;
    padding: 4px 12px;
  }
  input[type="checkbox"]:checked,
  input[type="checkbox"]:not(:checked) {
    width: 12px;
    height: 12px;
    cursor: pointer;
  }
  .firstOfTypeSex {
    margin-right: 20px;
  }
`;
