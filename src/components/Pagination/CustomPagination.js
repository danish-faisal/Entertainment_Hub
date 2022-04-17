import { createTheme, ThemeProvider } from "@material-ui/core";
import { Pagination } from '@material-ui/lab';
import React from 'react';

const darkTheme = createTheme({
    palette: {
        type: "dark",
    },
});

const CustomPagination = ({ page, totalPages, setPage }) => {

    const handlePageChange = (event, value) => {
        setPage(value);
        window.scrollTo(0, 0);
    }

    return (
        <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: 10 }}>
            <ThemeProvider theme={darkTheme}>
                <Pagination onChange={handlePageChange} count={totalPages} color="primary" />
            </ThemeProvider>
        </div>
    );
}

export default CustomPagination;