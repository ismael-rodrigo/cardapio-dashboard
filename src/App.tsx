import { createTheme, ThemeProvider } from "@mui/material"
import { useMemo } from "react";
import HomePage from "./pages/HomePage"

function App() {

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: true ? 'dark' : 'light',
        },
      }),
    [],
  );




  return (
    <ThemeProvider theme={theme}>
      <HomePage/>
    </ThemeProvider>

  )
}

export default App
