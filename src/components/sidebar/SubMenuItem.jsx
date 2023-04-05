import { Link } from "react-router-dom";
import { MenuItem } from "react-pro-sidebar";
import { Typography, useTheme } from "@mui/material";
import { useProSidebar } from "react-pro-sidebar";

const SubMenuItem = ({ item }) => {
  const theme = useTheme();
  const { toggleSidebar } = useProSidebar();
  const onClick = () => {
    item?.setSelected(item?.title);
    toggleSidebar(false);
  };

  if (!item.to) {
    return (
      <Typography
        variant="body2"
        sx={{ ml: "25px", fontSize: "14px", fontWeight: "bold" }}
        color={theme.palette.grey[800]}
      >
        {item?.title}
      </Typography>
    );
  }

  return (
    <MenuItem
      routerLink={<Link to={item?.to} />}
      active={item?.selected === item?.title}
      onClick={onClick}
      icon={item.icon}
    >
      {item?.title}
    </MenuItem>
  );
};

export default SubMenuItem;
