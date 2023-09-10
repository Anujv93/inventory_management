/* eslint-disable react/prop-types */
import { Table, Dropdown } from "flowbite-react";

const TableComponent = ({ data, columns, actions }) => {
  const handleActionClick = (action, item) => {
    action.onClick(item); // Execute the onClick function of the selected action
  };
  return (
    <Table hoverable>
      <Table.Head>
        {columns.map((column, index) => (
          <Table.HeadCell key={index}>{column}</Table.HeadCell>
        ))}
        <Table.HeadCell>Actions</Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        {data.map((item, index) => (
          <Table.Row
            key={index}
            className="bg-white dark:border-gray-700 dark:bg-gray-800"
          >
            {columns.map((column, colIndex) => (
              <Table.Cell key={colIndex}>{item[column]}</Table.Cell>
            ))}
            <Table.Cell>
              <Dropdown className="overflow-auto" label="Actions" size="sm" placement="bottom">
                {actions.map((action, index) => (
                  <Dropdown.Item
                    key={index}
                    onClick={() => handleActionClick(action, item)}
                  >
                    {action.label}
                  </Dropdown.Item>
                ))}
              </Dropdown>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default TableComponent;
