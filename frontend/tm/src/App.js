import { AuthProvider } from "./context/AuthContext";
import { TaskProvider } from "./context/TaskContext";
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
