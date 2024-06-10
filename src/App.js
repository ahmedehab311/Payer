import Main from "./components/Main";
import Container from "@mui/material/Container";
import "./index.css";
function App() {
  // useEffect(() => {
  //   axios
  //     .get("https://api.aladhan.com/v1/methods")
  //     .then((response) => console.log(response))
  //     .catch((err) => console.error(err));
  // }, []);
  // useEffect(() => {
  //   axios
  //     .get(
  //       "https://api.aladhan.com/v1/timings/:date?latitude=51.75865125&longitude=-1.25387785"
  //     )
  //     .then((response) => setData(response.data.data))
  //     .catch((err) => console.error(err));
  // }, []);
  // console.log(typeof data);
  // console.log(data);

  // useEffect(() => {
  //   axios
  //     .get("https://api.aladhan.com/v1/timings/:date")
  //     .then((response) => console.log(response))
  //     .catch((err) => console.error(err));
  // }, []);
  // if (!Array.isArray(data)) {
  //   return <div>No data available.</div>;
  // }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="xl">
        <Main />
      </Container>
    </div>
  );
}

export default App;
