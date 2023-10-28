import Layout from '@/components/Layout';

export default function MealsLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return <Layout>{children}</Layout>;
}
