// app/components/UserInfo.tsx
import { checkUser } from "@/lib/checkUser";

const UserInfo = async () => {
  const user = await checkUser();

  if (!user) {
    return <div className="text-red-500">Utilisateur non connecté</div>;
  }

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-2">Informations de l'utilisateur</h2>
      <p><strong>Nom :</strong> {user.name}</p>
      <p><strong>Email :</strong> {user.email}</p>
      <p><strong>Rôle :</strong> {user.role}</p>
      <p><strong>Crédits :</strong> {user.userCredits?.credits ?? 0}</p>

      {user.profile && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Profil</h3>
          {/* Ajoute ici les champs de profil que tu souhaites afficher */}
          <p><strong>Bio :</strong> {user.profile.bio}</p>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
