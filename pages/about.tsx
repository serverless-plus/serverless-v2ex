import Layout from '../components/Layout';

const AboutPage = () => (
  <Layout title='About | Serverless V2EX'>
    <div className='about-info' style={{ height: '100vh' }}>
      <dt>关于项目</dt>
      <dd>
        使用 Next.js + TypeScript 开发，并且基于 Serverless 部署的 V2EX 客户端
      </dd>
      <dt>源码地址</dt>
      <dd>
        <a href='https://github.com/serverless-plus/serverless-v2ex'>
          https://github.com/serverless-plus/serverless-v2ex
        </a>
      </dd>
      <dt>意见反馈</dt>
      <dd>
        <a href='https://github.com/serverless-plus/serverless-v2ex/issues'>
          发表意见或者提需求
        </a>
      </dd>
      <dt>当前版本</dt>
      <dd>V0.0.1</dd>
    </div>
  </Layout>
);

export default AboutPage;
