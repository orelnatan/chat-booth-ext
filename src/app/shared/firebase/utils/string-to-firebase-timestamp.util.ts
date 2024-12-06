import { FirebaseTimestamp } from "../classes";

export function stringToFirebaseTimestamp(value: string): FirebaseTimestamp {
  if(!value) return null;

  const [secondsStr, nanosStr = "0"] = value.split(".");
  return new FirebaseTimestamp(
    parseInt(secondsStr, 10),
    parseInt(nanosStr.padEnd(9, "0"), 10)
  );
}