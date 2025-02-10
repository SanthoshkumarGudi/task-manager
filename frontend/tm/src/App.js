import { AuthProvider } from "./components/Auth/context/AuthContext";
import { TaskProvider } from "./components/Auth/context/TaskContext";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <AppRouter />
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
