import Background from '../../components/Background';

export default function PrivacyPolicy() {
  return (
    <Background>
      <div className="flex flex-col gap-[1.5rem] w-[75%] m-auto items-center text-[#183249] text-center py-20">
        <h2 className="font-bold text-3xl">Privacy Policy</h2>
        <div className="text-left">
          <h3 className="font-semibold text-xl">Privacy Policy for WDCC Membership Checker</h3>
          <p>Effective Date: 26th January 2024</p>
          <br />
          <p>The Web Development Consulting Club (registered charity), or WDCC, ("we", "us", or "our") operates the Membership Checker web application (the "App"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our App and the choices you have associated with that data.</p>
          <br />
          <h4 className="font-semibold text-lg">Information Collection and Use</h4>
          <br />
          <ul className="list-disc">
            <li>
              <h5 className="font-bold text-md">Google OAuth</h5>
              Our App uses Google OAuth for authentication purposes. When you log in using Google OAuth, we collect your Google email and name to create and manage your user account within our system.
            </li>
            <li> 
              <h5 className="font-bold text-md">File Access</h5>
            If you choose to share files with our service account, we will only access and store those files for the purpose of providing the intended service. We do not access or use these files for any other purpose.
            </li>
            <li>
          <h5 className="font-bold text-md"> Data Security</h5>
          We prioritize the security of your data and take reasonable steps to protect it from unauthorized access, disclosure, alteration, and destruction.
          </li>
          <li><h5 className="font-bold text-md">Information Sharing</h5>
          We do not share your personal information with third parties unless required by law or as necessary to provide our services. Your files shared with our service account are treated with strict confidentiality.
          </li>
          <li><h5 className="font-bold text-md">Cookies and Tracking</h5>
          Our App does not use tracking cookies or any other tracking mechanisms.
          </li>
          <li><h5 className="font-bold text-md">Your Choices</h5>
          You can choose not to share certain information, but this may limit your ability to use certain features of the App.
          </li>
          <li><h5 className="font-bold text-md">Changes to This Privacy Policy</h5>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
          </li>
          <li>
            <h5 className="font-bold text-md">Contact Us</h5>
            If you have any questions about this Privacy Policy, please contact us at [your email address].
            By using the App, you agree to the collection and use of information in accordance with this policy.
          </li>
          </ul>

        </div>
      </div>
    </Background>
  );
}
