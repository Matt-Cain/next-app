import Layout from '@/pages/MealPlan/Layout';

export default function MealPlanLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return <Layout>{children}</Layout>;
}
