"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function InvitePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [invite, setInvite] = useState<{
    status: string,
    invitee_email_masked?: string
  }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { data: session, status } = useSession();

  // Fetch invite details
  const fetchInvite = async () => {
    if (!token) {
      setError("No token found");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL_BACKEND}/project/invites/resolve`,
        {
          params: { token },
          headers: session?.user?.access_token
            ? { Authorization: `Bearer ${session.user.access_token}` }
            : {},
        }
      );
      setInvite(res.data);
    } catch (err) {
      console.error("Error fetching invite:", err);
      setError("Failed to load invite");
    } finally {
      setLoading(false);
    }
  };

  // Accept / Decline actions
  const handleAction = async (action: "accept" | "decline") => {
    try {
      setLoading(true);
      setError("");

      await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL_BACKEND}/project/invites/${action}`,
        {},  // empty body
        {
            params: { token },
            headers: { Authorization: `Bearer ${session?.user.access_token}` }
        }
        );

      if (action === "accept") {
        router.push("/projects");
      } else {
        router.push("/");
      }
    } catch (err) {
      console.error(`Error on ${action}:`, err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status !== "loading") {
      fetchInvite();
    }
  }, [token, status]);

  if (loading)
    return <p className="text-center text-gray-400">Loading invite...</p>;

  if (error) return <p className="text-center text-red-500">{error}</p>;

  if (!invite)
    return <p className="text-center text-red-500">Unexpected response</p>;

  if (invite.status === "expired") {
    return <InviteMessage title="Invite expired" body="This invite link has expired." />;
  }

  if (invite.status === "invalid") {
    return <InviteMessage title="Invalid invite" body="This invite link is invalid." />;
  }

  if (invite.status === "auth_required") {
    return (
      <InviteMessage
        title="Login required"
        body={`Please log in with ${invite.invitee_email_masked} to continue.`}
        action={
          <ActionButton text="Log In" onClick={() => router.push("/login")} color="blue" />
        }
      />
    );
  }

  if (invite.status === "wrong_account") {
    return (
      <InviteMessage
        title="Wrong account"
        body={`You are logged in as a different user. Please log in with ${invite.invitee_email_masked}.`}
        action={
          <ActionButton text="Switch Account" onClick={() => router.push("/login")} color="blue" />
        }
      />
    );
  }

  if (invite.status === "ready_to_accept") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 p-4">
        <div className="bg-[#1F2121] rounded-2xl shadow-xl p-8 max-w-md w-full border border-neutral-800">
          <h2 className="text-2xl font-bold text-white mb-4">
            Invitation to collaborate
            </h2>

          <div className="flex gap-4">
            <ActionButton text="Accept" onClick={() => handleAction("accept")} color="green" />
            <ActionButton text="Decline" onClick={() => handleAction("decline")} color="red" />
          </div>
        </div>
      </div>
    );
  }

  return <p className="text-center text-red-500">Unexpected response</p>;
}

// ------------------------
// Reusable UI Components
// ------------------------

function InviteMessage({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 p-4 my-10">
      <div className="bg-[#1F2121] rounded-2xl shadow-xl p-8 max-w-md w-full border border-neutral-800 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
        <p className="text-gray-300">{body}</p>
        {action}
      </div>
    </div>
  );
}

function ActionButton({
  text,
  onClick,
  color,
}: {
  text: string;
  onClick: () => void;
  color: "green" | "red" | "blue";
}) {
  const base =
    "flex-1 py-2 px-4 rounded-lg text-white transition font-medium";
  const colors: Record<typeof color, string> = {
    green: "bg-green-600 hover:bg-green-700",
    red: "bg-red-600 hover:bg-red-700",
    blue: "bg-blue-600 hover:bg-blue-700",
  };

  return (
    <button onClick={onClick} className={`${base} ${colors[color]}`}>
      {text}
    </button>
  );
}
