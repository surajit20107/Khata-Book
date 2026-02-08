export const apiFetch = async (url: string, method: string, body?: any) => {
  try {
    const options: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // important for cookies!
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const res = await fetch(url, options);

    // handle non-2xx responses
    const data = await res.json().catch(() => null);

    if (!res.ok) {
      return {
        success: false,
        message: data?.message || "Something went wrong",
      };
    }

    return {
      success: true,
      data,
    };
  } catch (err) {
    const message =
      err instanceof Error
        ? err.message
        : "Something went wrong, Try again later";

    return {
      success: false,
      message,
    };
  }
};
