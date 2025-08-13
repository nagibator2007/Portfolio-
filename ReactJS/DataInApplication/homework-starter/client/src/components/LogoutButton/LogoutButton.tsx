import { Button } from "../Button";
import "./LogoutButton.css";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../api/queryClient"; // Обновляем кэш
import { logout } from "../../api/User";

export const LogoutButton = () => {

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.clear();
      window.location.reload();
    },
  }, queryClient);

  const handleLogoutClick = () => {
    logoutMutation.mutate();
  };

  return (
    <div className="logout-button">
      <Button kind="secondary" onClick={handleLogoutClick} isLoading={logoutMutation.isPending}>
        {logoutMutation.isPending ? "Выход..." : "Выйти"}
      </Button>
    </div>
  );
};