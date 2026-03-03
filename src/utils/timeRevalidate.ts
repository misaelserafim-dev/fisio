const time = parseInt(process.env.NEXT_PUBLIC_REVALIDATE?.toString() || "60");

export default time;
