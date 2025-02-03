//import ClientProvider from "@/components/ClientProvider";
import UserCartComponent from "@/components/userCart/UserCartComponent";

const UserCart = () => {
  return (
  //  <ClientProvider>
    <div className="bg-lightGray  relative mx-auto w-full xl:h-[1260px] h-auto overflow-hidden">
      <UserCartComponent />
    </div>
 //   </ClientProvider>
  );
};

export default UserCart;
