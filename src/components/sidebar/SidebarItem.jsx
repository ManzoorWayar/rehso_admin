import { Link } from "react-router-dom";
import { MenuItem, SubMenu } from "react-pro-sidebar";
import { Typography, useTheme, Tooltip } from "@mui/material";
import { useProSidebar } from "react-pro-sidebar";
import SubMenuItem from "./SubMenuItem";
const SidebarItem = ({ item }) => {
  const theme = useTheme();
  const { toggleSidebar, toggled, collapsed } = useProSidebar();

  const onClick = () => {
    item?.setSelected(item?.title);
    toggleSidebar(false);
  };

  if (item?.subMenuTitle) {
    return (
      <SubMenu
        label={item?.subMenuTitle}
        icon={
          toggled || collapsed ? (
            <Tooltip
              title={item?.subMenuTitle}
              arrow
              placement="left"
              PopperProps={{
                sx: {
                  "& .MuiTooltip-tooltip": {
                    backgroundColor: theme.palette.grey[800],
                    color: theme.palette.grey[200],
                  },
                  "& .MuiTooltip-arrow": {
                    color: theme.palette.grey[800],
                  },
                  zIndex: 2334,
                },
              }}
            >
              {item?.subMenuIcon}
            </Tooltip>
          ) : (
            item?.subMenuIcon
          )
        }
      >
        {item?.subMenuItems.map((item, _) => {
          return <SubMenuItem item={item} key={_} />;
        })}
      </SubMenu>
    );
  }

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
      icon={
        toggled || collapsed ? (
          <Tooltip
            title={item?.title}
            arrow
            placement="left"
            PopperProps={{
              sx: {
                "& .MuiTooltip-tooltip": {
                  backgroundColor: theme.palette.grey[800],
                  color: theme.palette.grey[200],
                },
                "& .MuiTooltip-arrow": {
                  color: theme.palette.grey[800],
                },
                zIndex: 2334,
              },
            }}
          >
            {item?.icon}
          </Tooltip>
        ) : (
          item.icon
        )
      }
    >
      {item?.title}
    </MenuItem>
  );
};

export default SidebarItem;
