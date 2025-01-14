import Head from "next/head";

import { ProjectName } from "@/common/constants";
import Footer from "@/features/ui/footer";
import Layout from "@/features/ui/layout";

export default function New() {
  // TODO: looks like we're hitting /info every time we switch to a different page
  return (
    <>
      <Head>
        <title>{ProjectName} New Cards</title>
        <meta name="description" content="TODO" /> {/* TODO */}
      </Head>
      <Layout>
        <h1>What&apos;s New?</h1>
        <p>Under construction</p>
        <Footer />
      </Layout>
    </>
  );
}
