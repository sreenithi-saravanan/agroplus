import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from "@/lib/LanguageContext";
import { Layout } from "@/components/Layout";
import Home from "@/pages/Home";
import Prices from "@/pages/Prices";
import Scan from "@/pages/Scan";
import News from "@/pages/News";
import Roadmap from "@/pages/Roadmap";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/prices" component={Prices} />
      <Route path="/scan" component={Scan} />
      <Route path="/news" component={News} />
      <Route path="/roadmap" component={Roadmap} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <Layout>
          <Router />
        </Layout>
        <Toaster />
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
