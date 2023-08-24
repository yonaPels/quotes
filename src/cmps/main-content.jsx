import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import React from "react";
import { GenerateQuote } from "./generate-quote";
import { FavoriteQuotes } from "./favorite-quotes";

export function MainContent(){

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    }

    return(
        <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Generate quotes" value="1" />
                <Tab label="favorite quotes" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1"><GenerateQuote/></TabPanel>
            <TabPanel value="2"><FavoriteQuotes/></TabPanel>
        </TabContext>
    )
}