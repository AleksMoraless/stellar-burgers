import store, { useSelector } from "../../services/store";
import { userSelectors } from "../../services/slices/userSlice";
import { Preloader } from "@ui";
import { Navigate, useLocation } from "react-router";
import { log } from "console";

type ProtectedRouteProps = {
  onlyUnAuth?: boolean,
  children: React.ReactElement;
};

export const ProtectedRoute = ({ onlyUnAuth, children }: ProtectedRouteProps) => {
  const isAuthChecked = useSelector(store => userSelectors.isAuthCheckedUserSelect(store)); // isAuthCheckedSelector — селектор получения состояния загрузки пользователя
  const user = useSelector(store => userSelectors.userSelect(store)); // userDataSelector — селектор получения пользователя из store
  const location = useLocation();

  if(!isAuthChecked) {
    return <Preloader />
  }

  if (!onlyUnAuth && !user) { //  если маршрут для авторизованного пользователя, но пользователь не авторизован, то делаем редирект
    return <Navigate replace to='/login' state={{from: location}} />;
    
  }

  if (onlyUnAuth && user) { //  если маршрут для неавторизованного пользователя, но пользователь авторизован 
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={ from } />;
  }

  return children;
}
