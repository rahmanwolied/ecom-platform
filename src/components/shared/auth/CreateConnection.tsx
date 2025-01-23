"use client";
import Image from "next/image";
import { useState } from "react";
import QRCode from "qrcode";
import { ACAPY_API_URL, BEARER_TOKEN } from "@/config";
import axios from "axios";
import { Button } from "@/components/ui/button";

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${BEARER_TOKEN}`,
};

const body = {
  accept: ["didcomm/aip1", "didcomm/aip2;env=rfc19"],
  alias: "Ecommerce Marketplace",
  goal: "To connect with the Ecommerce Marketplace",
  goal_code: "connect-marketplace",
  handshake_protocols: ["https://didcomm.org/didexchange/1.0"],
  my_label: "Ecommerce Marketplace",
};

interface CreateConnectionFormProps {
  setConnectionId: (connectionId: string) => void;
  connectionId: string | null;
}

export default function CreateConnectionForm({
  setConnectionId,
  connectionId,
}: CreateConnectionFormProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<string>("");
  const [invitationId, setInvitationId] = useState<string | null>(null);

  const handleConnection = async () => {
    try {
      // 1. Create invitation
      const response = await axios.post(
        `${ACAPY_API_URL}/out-of-band/create-invitation`,
        body
      );

      if (response.status === 200) {
        const data = response.data;
        const inviteURL = data.invitation_url;
        setInvitationId(data.invi_msg_id); // Store the invitation message ID

        const qrCodeDataUrl = await QRCode.toDataURL(inviteURL);
        setQrCodeUrl(qrCodeDataUrl);
        setConnectionStatus("Invitation created. Waiting for connection...");

        // Start polling for connection
        pollForConnection(data.invi_msg_id);
      } else {
        console.error("API service unavailable", response);
        setConnectionStatus("Error: API service unavailable");
      }
    } catch (err) {
      console.error("Failed to generate invitation:", err);
      setConnectionStatus("Error: Failed to generate invitation");
    }
  };

  const pollForConnection = async (inviteMsgId: string) => {
    const checkConnections = async () => {
      try {
        // Query connections with the invitation message ID
        const response = await fetch(
          `${ACAPY_API_URL}/connections?invitation_msg_id=${inviteMsgId}`,
          {
            headers,
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data.results && data.results.length > 0) {
            const connection = data.results[0];
            setConnectionId(connection.connection_id);
            setConnectionStatus(connection.state);

            if (
              connection.state === "invitation" ||
              connection.state === "request"
            ) {
              setConnectionStatus("Waiting for connection...");
            }
            // If connection is active, stop polling
            if (
              connection.state === "active" ||
              connection.state === "response"
            ) {
              setConnectionStatus(connection.connection_id);
              // Save connection ID to cookies
              document.cookie = `connectionId=${connection.connection_id}; path=/; max-age=86400`; // Expires in 24 hours
              return true;
            }
          }
        }
        return false;
      } catch (error) {
        console.error("Error checking connections:", error);
        return false;
      }
    };

    // Poll every 5 seconds until connection is active
    const poll = async () => {
      const isComplete = await checkConnections();
      if (!isComplete) {
        setTimeout(poll, 5000);
      }
    };

    poll();
  };

  return (
    <div className="flex flex-col gap-4 p-4 rounded-md border border-white/20 justify-center items-center">
      <form
        className="flex flex-col gap-4"
        action={async () => await handleConnection()}
      >
        <Button
          type="submit"
          className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md w-fit"
        >
          Create Connection
        </Button>
      </form>

      {connectionId && (
        <div className="text-sm bg-gray-100 p-2 rounded mt-2">
          <strong>Connection ID:</strong> {connectionStatus}
        </div>
      )}

      {qrCodeUrl && (
        <div className="flex flex-col items-center gap-2">
          <p className="text-sm text-gray-600">
            Scan this QR code to establish connection
          </p>
          <div className="flex justify-center">
            <Image
              src={qrCodeUrl}
              alt="Connection QR Code"
              width={450}
              height={450}
            />
          </div>
        </div>
      )}
    </div>
  );
}
