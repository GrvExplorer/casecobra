import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Steps from "@/components/ui/Steps";

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <MaxWidthWrapper className={''}>
      <Steps />
      {children}
    </MaxWidthWrapper>
  );
}