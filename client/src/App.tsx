function App() {
  const serverTest = async () => {
    const response = await fetch('http://localhost:3000');
    console.log(response);
    const data = await response.json();
    alert(data.message);
  };
  return (
    <>
      <h1>Hello from app</h1>
      <button onClick={() => serverTest()}>Test server</button>
    </>
  );
}

export default App;
