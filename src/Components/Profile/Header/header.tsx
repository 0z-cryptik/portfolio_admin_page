import { Email } from "./Email/email";
import { Name } from "./Name/name";

export function Header() {
  return (
    <header className="border-b border-slate-800 pb-6">
      <Name />
      <Email />
    </header>
  );
}
