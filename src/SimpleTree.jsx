import React, { useState, useEffect } from "react";
import axios from "axios";
import IndeterminateCheckBoxRoundedIcon from "@mui/icons-material/IndeterminateCheckBoxRounded";
import DisabledByDefaultRoundedIcon from "@mui/icons-material/DisabledByDefaultRounded";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import { styled, alpha } from "@mui/material/styles";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem, treeItemClasses } from "@mui/x-tree-view/TreeItem";
import { useNavigate } from "react-router-dom";
import "./form.css";
const CustomTreeItem = styled(TreeItem)(({ theme }) => ({
  [`& .${treeItemClasses.content}`]: {
    padding: theme.spacing(0.5, 1),
    margin: theme.spacing(0.2, 0),
  },
  [`& .${treeItemClasses.iconContainer}`]: {
    "& .close": {
      opacity: 0.3,
    },
  },
  [`& .${treeItemClasses.groupTransition}`]: {
    marginLeft: 15,
    paddingLeft: 18,
    borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
  },
}));

function ExpandIcon(props) {
  return <AddBoxRoundedIcon {...props} sx={{ opacity: 0.8 }} />;
}

function CollapseIcon(props) {
  return <IndeterminateCheckBoxRoundedIcon {...props} sx={{ opacity: 0.8 }} />;
}

function EndIcon(props) {
  return <DisabledByDefaultRoundedIcon {...props} sx={{ opacity: 0.3 }} />;
}

const transformDataToHierarchy = (data) => {
  const hierarchy = {};

  data.forEach((employee) => {
    const { employeeEmail, managerEmail } = employee;

    if (!hierarchy[employeeEmail]) {
      hierarchy[employeeEmail] = {
        label: employeeEmail,
        children: [],
      };
    }

    if (managerEmail) {
      if (!hierarchy[managerEmail]) {
        hierarchy[managerEmail] = {
          label: managerEmail,
          children: [],
        };
      }
      hierarchy[managerEmail].children.push(hierarchy[employeeEmail]);
    }
  });

  const convertToTree = (email) => {
    if (!hierarchy[email]) return null;

    return (
      <CustomTreeItem key={email} itemId={email} label={email}>
        {hierarchy[email].children.map((child) => convertToTree(child.label))}
      </CustomTreeItem>
    );
  };

  const topLevelManagers = Object.keys(hierarchy).filter((email) => {
    return !data.some((emp) => emp.employeeEmail === email && emp.managerEmail);
  });

  return topLevelManagers.length > 0
    ? topLevelManagers.map((email) => convertToTree(email))
    : null;
};

const BorderedTreeView = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedItems, setExpandedItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://docker-backend-0t2v.onrender.com/employees"
        );
        setData(response.data);
        const topManagers = response.data
          .filter((emp) => emp.managerEmail === null)
          .map((emp) => emp.employeeEmail);

        setExpandedItems(topManagers);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const transformedTree = transformDataToHierarchy(data);

  if (loading) return <div><center>Loading...</center></div>;

  return (
    <div>
      <center>
        {transformedTree ? (
          <SimpleTreeView
            aria-label="customized"
            defaultExpandedItems={expandedItems}
            slots={{
              expandIcon: ExpandIcon,
              collapseIcon: CollapseIcon,
              endIcon: EndIcon,
            }}
            sx={{
              overflowX: "hidden",
              minHeight: 270,
              flexGrow: 1,
              maxWidth: 300,
            }}
          >
            {transformedTree}
          </SimpleTreeView>
        ) : (
          <center>
            <p>No hierarchical data found. Please check the backend.</p>
          </center>
        )}
      </center>
      <center>
        <button onClick={() => navigate("/form")}>Go Back</button>
      </center>
    </div>
  );
};

export default BorderedTreeView;