import AppNavBarBottom from "./AppNavBarBottom";
import AppNavBarTop from "./AppNavBarTop";

interface appNavBarProps {
  user: User;
}

const AppNavBar = ({ user }: appNavBarProps) => {
  return (
    <div className="flex flex-col border-b-2 border-primary">
      <AppNavBarTop user={user}></AppNavBarTop>
      {/*<AppNavBarBottom user={user}></AppNavBarBottom>*/}
    </div>
  );
};

export default AppNavBar;
