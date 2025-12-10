import { withPayload } from "@payloadcms/next/withPayload";

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

const payloadConfig = withPayload(nextConfig)

payloadConfig.turbopack = undefined
export default payloadConfig