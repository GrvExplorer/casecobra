import MaxWidthWrapper from "@/components/MaxWidthWrapper";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <MaxWidthWrapper>{children}</MaxWidthWrapper>;
}
