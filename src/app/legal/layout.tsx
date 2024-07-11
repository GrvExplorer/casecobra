import MaxWidthWrapper from "@/components/MaxWidthWrapper";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <MaxWidthWrapper className={'h-[70vh] overflow-y-scroll'}>{children}</MaxWidthWrapper>;
}
