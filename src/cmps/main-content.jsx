import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import React from "react";
import { GenerateQuote } from "./generate-quote";
import { FavoriteQuotes } from "./favorite-quotes";
import { QuotesByCategory } from "./quotes-by-category";

/**
 * MainContent Component
 * This component represents the main content of the application.
 * It includes tabs for generating quotes and viewing favorite quotes.
 */
export function MainContent() {
  const [value, setValue] = React.useState("1");

  /**
   * Handle Tab Change
   * This function handles the tab change event and updates the selected tab value.
   * param {Event} event - The tab change event.
   * param {string} newValue - The new tab value.
   */
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <TabContext value={value}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <TabList
          onChange={handleChange}
          aria-label="lab API tabs example"
          variant="scrollable"
        >
          <Tab label="Generate quote" value="1" />
          <Tab label="favorite quotes" value="2" />
          <Tab label="quotes by category" value="3" />
        </TabList>
      </Box>
      <TabPanel value="1">
        <GenerateQuote />
      </TabPanel>
      <TabPanel value="2">
        <FavoriteQuotes />
      </TabPanel>
      <TabPanel value="3">
        <QuotesByCategory />
      </TabPanel>
    </TabContext>
  );
}
