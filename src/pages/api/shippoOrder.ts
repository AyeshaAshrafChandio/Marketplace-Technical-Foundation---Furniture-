import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function shippoOrder(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const { addressFrom, addressTo, parcels, orderId, totalAmount } = req.body;

    try {
        const response = await axios.post(
            "https://api.goshippo.com/shipments/",
            {
                address_from: addressFrom,
                address_to: addressTo,
                parcels,
                async: false,
            },
            {
                headers: {
                    Authorization: `shippo_test_469772726a5f37b77738bdf5edaeac3164223c1e `,
                    "Content-Type": "application/json",
                },
            }
        );

        // Debug full response
        console.log("Full Shipment Response:", response.data);

        // Extract tracking and shipment data
        const shipment = response.data;

        // Check for tracking data in the response object
        const trackingNumber = shipment.object_id

        const eta = shipment.eta || "3-5 business days"; // Default ETA if not available

        res.status(200).json({
            orderId,
            totalAmount,
            trackingNumber, // Pass the tracking number from the API
            eta,            // Pass ETA from the API
            status: "Shipment created successfully!",
        });
    } catch (error: any) {
        console.error("Error creating shipment:", error.response?.data || error.message);
        res.status(500).json({ message: "Failed to create shipment", error: error.response?.data });
    }
}