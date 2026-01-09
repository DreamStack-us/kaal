import React from "react";
import styles from "./styles.module.css";

interface ExpoSnackEmbedProps {
  /**
   * The Expo Snack ID (from snack.expo.dev/@username/snack-name)
   * OR a full snack URL
   */
  snackId: string;
  /**
   * Height of the embed (default: 600px)
   */
  height?: number;
  /**
   * Whether to show the preview panel (default: true)
   */
  preview?: boolean;
  /**
   * Platform to preview: 'ios' | 'android' | 'web' (default: 'ios')
   */
  platform?: "ios" | "android" | "web";
  /**
   * Theme: 'light' | 'dark' (default: follows Docusaurus theme)
   */
  theme?: "light" | "dark";
  /**
   * Whether to show the device frame in preview
   */
  deviceFrame?: boolean;
}

export default function ExpoSnackEmbed({
  snackId,
  height = 500,
  preview = true,
  platform = "ios",
  theme,
  deviceFrame = true,
}: ExpoSnackEmbedProps): React.ReactElement {
  // Build the snack URL with parameters
  const baseUrl = snackId.startsWith("http")
    ? snackId
    : `https://snack.expo.dev/${snackId}`;

  const params = new URLSearchParams({
    embed: "1",
    preview: preview ? "true" : "false",
    platform,
    hideQueryParams: "true",
    deviceFrame: deviceFrame ? "true" : "false",
  });

  // Theme follows Docusaurus if not specified
  if (theme) {
    params.set("theme", theme);
  }

  const snackUrl = `${baseUrl}?${params.toString()}`;

  return (
    <div className={styles.container}>
      <iframe
        src={snackUrl}
        className={styles.iframe}
        style={{ height: `${height}px` }}
        title="Expo Snack"
        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
        loading="lazy"
      />
    </div>
  );
}
