"use client"
import {useRouter} from "next/navigation";
import ClientPage from "@/components/basic/layout/clientPage";
import {usePopUp} from "@/components/basic/layout/clientLayout";

export default function Home() {
  const router = useRouter();

  return (
      <ClientPage>
          <h1>Welcome home page!</h1>
          <div>
              <button onClick={() => router.push("/afterLoginPage")}>See something (Require login)</button>
          </div>
          <div>
              <PopupButton />
          </div>
      </ClientPage>
  );
}

function PopupButton() {
    const showPopup = usePopUp();
    return (<button onClick={() => showPopup("hihihihi")}>Show PopUp</button>);
}