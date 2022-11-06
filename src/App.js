import TablaInmultirii from "./components/tabla-inmultirii";
import TestTablaInmultirii from "./components/test-tabla-inmultirii";

function App() {
  return (
    <div className="container">
      <TestTablaInmultirii />
      <TablaInmultirii n={4} />
    </div>
  );
}

export default App;
