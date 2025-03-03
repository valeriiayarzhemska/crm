export const EmailPreview = ({ htmlContent }) => {
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  );
};
