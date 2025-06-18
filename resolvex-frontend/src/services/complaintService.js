export async function submitComplaint(complaintData) {
  console.log("Sending complaintData:", complaintData);

  try {
    const payload = {
      name: complaintData.anonymous ? "Anonymous" : complaintData.name,
  role: complaintData.anonymous ? "Anonymous" : complaintData.role,
      department: complaintData.department,
      sub_department: complaintData.subDepartment,  // ✅ fixed key name
      subject: complaintData.subject,
      description: complaintData.description,
      urgency: complaintData.urgency,
      anonymous: complaintData.anonymous
    };

    const response = await fetch("http://localhost:8000/api/complaints", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Backend validation error:", JSON.stringify(errorData, null, 2));
        throw new Error("Failed to submit complaint");
      }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
