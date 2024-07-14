import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SocketProvider from "./components/socket-provider.tsx";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <SocketProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </SocketProvider>
  </>
);
