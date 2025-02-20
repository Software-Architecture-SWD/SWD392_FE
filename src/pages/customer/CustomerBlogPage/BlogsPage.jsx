import {
  Typography,
  Tabs,
  Tab,
  Box,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import React, { useState } from "react";
import SearchBar from "../../../components/common/SearchBar";
import Grid from "@mui/material/Grid2";
import { Link } from "react-router-dom";

export default function BlogsPage() {
  const [tab, setTab] = useState("blog");

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const blogsData = [
    {
      id: 1,
      title: "Understanding React Hooks asdasd as dasd ad  dasdasdsa",
      type: "blog",
      paragraphs: [
        {
          subTitle:
            "Introduction to Hooks dasdas das dasd asdasdasdsd asd adasdasdasd",
          image: "https://picsum.photos/400/200?random=1",
          content:
            "React Hooks were introduced in React 16.8 to allow functional components to manage state and lifecycle methods without needing class components. Before hooks, developers relied on class components for features like state management and side effects using lifecycle methods such as componentDidMount and componentWillUnmount. Hooks like useState and useEffect simplify these processes by enabling function components to have local state and perform side effects efficiently. This innovation has made React development more intuitive, reducing boilerplate code and enhancing reusability through custom hooks.",
        },
        {
          subTitle: "Commonly Used Hooks",
          image: "https://picsum.photos/400/200?random=2",
          content:
            "React provides a set of built-in hooks, each serving a specific purpose. The useState hook allows you to manage local state within a function component. The useEffect hook enables side effects such as data fetching, subscriptions, and manually changing the DOM in a declarative manner. Additionally, hooks like useContext, useReducer, and useMemo provide powerful capabilities, helping developers manage global state, optimize performance, and handle complex application logic efficiently.",
        },
      ],
    },
    {
      id: 2,
      title: "Modern UI Design Principles",
      type: "blog",
      paragraphs: [
        {
          subTitle: "Minimalism in Design ",
          image: "https://picsum.photos/400/200?random=4",
          content:
            "A clean and minimal UI ensures das das d asd s better usability and accessibility, making interfaces more intuitive. Minimalist design focuses on removing unnecessary elements and only displaying what is essential for the user. This principle helps improve readability, reduces cognitive load, and enhances overall user experience. By leveraging whitespace effectively and using simple typography, designers create interfaces that feel elegant, modern, and easy to navigate. This approach aligns with popular design trends like flat design and material design, which emphasize clarity and functionality.",
        },
        {
          subTitle: "Typography in UI Design",
          image: "https://picsum.photos/400/200?random=5",
          content:
            "Typography plays a crucial role in UI design, affecting both readability and user experience. A well-chosen font can make a website or application feel professional and trustworthy, while a poor typography choice can lead to confusion and frustration. Designers often use font pairings that create a hierarchy, with headings being bold and easy to scan, while body text remains legible and comfortable to read. Additionally, factors such as line height, letter spacing, and contrast must be carefully balanced to enhance accessibility and maintain aesthetic appeal.",
        },
      ],
    },
    {
      id: 3,
      title: "Hands-on React Workshop",
      type: "workshop",
      paragraphs: [
        {
          subTitle: "Setting Up Your First React App",
          image: "https://picsum.photos/400/200?random=6",
          content:
            "This workshop will guide you through setting up a React project using create-react-app. React is a powerful JavaScript library for building dynamic user interfaces, and setting up your first project is a crucial step toward becoming a React developer. The create-react-app command simplifies the setup process by configuring Webpack, Babel, and other essential tools automatically. Once the project is created, developers can focus on building reusable components, managing state, and integrating APIs to create feature-rich applications. Whether you are a beginner or an experienced developer, mastering React setup ensures a smooth workflow and an optimized development environment.",
        },
        {
          subTitle: "Understanding Component Lifecycle",
          image: "https://picsum.photos/400/200?random=7",
          content:
            "In React, the component lifecycle plays a key role in managing updates and optimizing performance. Functional components use hooks like useEffect to handle side effects, such as data fetching, subscriptions, and cleanup processes. The dependency array in useEffect allows developers to control when effects should run, preventing unnecessary re-renders and improving efficiency. Understanding lifecycle methods and their equivalents in hooks enables developers to create efficient, scalable, and maintainable applications.",
        },
      ],
    },
    {
      id: 4,
      title: "State Management in React",
      type: "blog",
      paragraphs: [
        {
          subTitle: "Using useState and useReducer",
          image: "https://picsum.photos/400/200?random=8",
          content:
            "State management is one of the most crucial aspects of React development. The useState hook is the simplest way to manage component state, allowing developers to define and update state variables within function components. However, for complex state logic, useReducer provides a more structured approach. It enables centralized state updates using actions and a reducer function, making the code more predictable and easier to debug. Choosing the right state management technique depends on the complexity of the application and how frequently the state changes.",
        },
        {
          subTitle: "Global State with Context API",
          image: "https://picsum.photos/400/200?random=9",
          content:
            "Managing global state efficiently is essential for building scalable React applications. The Context API allows developers to create a centralized state that can be accessed by multiple components without prop drilling. By wrapping components with a Context Provider, data can be shared seamlessly across different parts of the application. This approach simplifies state management and reduces unnecessary re-renders. When combined with useReducer, the Context API can serve as a lightweight alternative to state management libraries like Redux, offering both performance and maintainability benefits.",
        },
      ],
    },
    {
      id: 5,
      title: "CSS Grid vs. Flexbox",
      type: "blog",
      paragraphs: [
        {
          subTitle: "When to Use CSS Grid",
          image: "https://picsum.photos/400/200?random=10",
          content:
            "CSS Grid is a powerful layout system designed for two-dimensional layouts. It allows developers to define rows and columns explicitly, making it ideal for complex designs such as dashboards, gallery layouts, and multi-column structures. With features like grid-template-areas, grid-auto-flow, and fractional units (fr), CSS Grid provides precise control over layout structure, ensuring consistency across different screen sizes. By leveraging CSS Grid, designers and developers can create dynamic, responsive layouts with minimal code.",
        },
        {
          subTitle: "When to Use Flexbox",
          image: "https://picsum.photos/400/200?random=11",
          content:
            "Flexbox is best suited for one-dimensional layouts, such as navigation bars, card layouts, and form structures. Unlike CSS Grid, which operates in two dimensions, Flexbox arranges elements along a single axis, either horizontally or vertically. Properties like justify-content, align-items, and flex-wrap provide flexibility in positioning elements within a container. By using Flexbox for components that require dynamic alignment and spacing, developers can create responsive designs that adapt to different screen sizes effortlessly.",
        },
      ],
    },
  ];

  const filteredBlogs = blogsData.filter((item) => item.type === tab);

  return (
    <Box sx={{ padding: 5 }}>
      <Typography
        variant="h2"
        sx={{
          textAlign: "center",
          fontFamily: "Lora",
          fontWeight: "bold",
          mb: 3,
        }}
      >
        Blogs & Workshops
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Tabs
          value={tab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            fontWeight: "bold",
            "& .MuiTabs-indicator": {
              backgroundColor: "var(--primary-color)",
            },
            "& .MuiTab-root": {
              color: "gray",
            },
            "& .MuiTab-root.Mui-selected": {
              color: "var(--primary-color)",
            },
          }}
        >
          <Tab label="Blogs" value="blog" />
          <Tab label="Workshops" value="workshop" />
        </Tabs>

        <SearchBar />
      </Box>

      <Grid container spacing={3}>
        {filteredBlogs.map((item) => (
          <Grid size={{ lg: 6, md: 6, sm: 12, xs: 12 }} key={item.id}>
            <Card
              component={Link}
              to={`/blogs/${item.id}`}
              state={{ blog: item }}
              sx={{
                textDecoration: "none",
                display: "flex",
                backgroundColor: "white",
                color: "black",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                borderRadius: "12px",
                overflow: "hidden",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.03)",
                  boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.2)",
                  cursor: "pointer",
                },
              }}
            >
              {/* Left Side: Image */}
              <CardMedia
                component="img"
                sx={{
                  width: 180,
                  height: 180,
                  objectFit: "cover",
                }}
                image={item.paragraphs[0]?.image}
                title={item.paragraphs[0]?.subTitle}
              />

              {/* Right Side: Content */}
              <CardContent sx={{ padding: "16px" }}>
                {/* Title: Max 1 line with ellipsis */}
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "bold",
                    color: "#333",
                    mb: 1,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    width: "500px",
                  }}
                >
                  {item.title}
                </Typography>

                {/* Subtitle: Max 1 line with ellipsis */}
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  sx={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    width: "500px",
                  }}
                >
                  {item.paragraphs[0]?.subTitle}
                </Typography>

                {/* Content: Max 3 lines with ellipsis */}
                <Typography
                  variant="body2"
                  sx={{
                    mt: 1,
                    color: "#666",
                    lineHeight: "1.5",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    width: "500px",
                  }}
                >
                  {item.paragraphs[0]?.content}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
