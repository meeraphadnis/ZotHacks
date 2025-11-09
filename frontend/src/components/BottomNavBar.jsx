import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, PlusCircle, BookOpen } from "lucide-react";

export default function BottomNavBar() {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/add", label: "Add", icon: PlusCircle },
    { path: "/recipes", label: "Recipes", icon: BookOpen },
  ];

  const navStyle = {
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    backgroundColor: "#E8DECA", // cream background
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    padding: "10px 0",
    boxShadow: "0 -1px 6px rgba(0,0,0,0.1)",
    zIndex: 1000,
  };

  const navItemStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textDecoration: "none",
    fontFamily: "Marcellus, serif",
    fontSize: "12px",
    margin: "0 5px",
    transition: "color 0.2s",
  };

  const iconSize = 28;
  const activeColor = "#6EBF8B"; // mint green
  const inactiveColor = "#7A6D5F"; // dark cream

  return (
    <nav style={navStyle}>
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        const Icon = item.icon;

        return (
          <Link
            key={item.path}
            to={item.path}
            style={{
              ...navItemStyle,
              color: isActive ? activeColor : inactiveColor,
            }}
          >
            <Icon size={iconSize} />
            <span style={{ marginTop: "4px" }}>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
