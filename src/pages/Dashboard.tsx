import { CallDetails } from "../components/CallDetails";
import { CallsList } from "../components/CallsList";
import {useSocket} from "../hooks/useSocket.ts";

export const Dashboard = () => {
    useSocket() //3.1
  return (
    <main className="grid grid-cols-2">
      <CallsList />

      <CallDetails />
    </main>
  );
};
