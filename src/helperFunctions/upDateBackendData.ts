export async function updateBackendData<T>(
  destinationUrl: string,
  payload: Record<string, any>,
  httpMethod: string
): Promise<T> {
  try {
    const token = localStorage.getItem("admin_token");

    if (!token) {
      throw new Error("failed to fetch token from local storage");
      return;
    }

    const response = await fetch(destinationUrl, {
      method: httpMethod,
      headers: {
        "Content-Type": "application/json",
        "x-admin-token": token
      },
      body: JSON.stringify(payload)
    });

    // If the backend returns 401 (Wrong key or missing header)
    if (response.status === 401 || response.status === 403) {
      localStorage.removeItem("admin_token");
      window.location.reload(); // Trigger re-prompt
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error ||
          `Server responded with status: ${response.status}`
      );
    }

    const updatedData = await response.json();
    return updatedData;
  } catch (error: any) {
    console.error(`API Update Failed at [${destinationUrl}]:`, error);
    throw error;
  }
}
