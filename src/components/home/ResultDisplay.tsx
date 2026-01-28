"use client";

interface ResultsDisplayProps {
  result: any;
  onReset: () => void;
}

export default function ResultsDisplay({ result, onReset }: ResultsDisplayProps) {
  if (!result) return null;

  const { matchPercentage, skillsMatch, missingSkills, experienceMatch, educationMatch, analysis, suggestions } = result;

  return (
    <section className="mt-8 bg-white p-8 rounded-lg shadow-lg max-w-3xl mx-auto">
      <h3 className="text-3xl font-bold mb-6 text-center">🎉 Your Resume Match Results</h3>

      {/* Match Percentage */}
      <div className="mb-10">
        <p className="text-lg font-semibold mb-2">Match Percentage</p>
        <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
          <div
            className="bg-green-500 h-full rounded-full transition-all duration-700"
            style={{ width: `${matchPercentage}%` }}
          ></div>
        </div>
        <p className="text-center mt-2 text-xl font-bold">{matchPercentage}% Match</p>
      </div>

      {/* Skills Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Skills Matched */}
        <div className="p-6 border border-green-400 rounded-lg bg-green-50">
          <h4 className="text-lg font-semibold mb-4 text-green-600">Skills Matched</h4>
          {skillsMatch.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {skillsMatch.map((skill: string, index: number) => (
                <span
                  key={index}
                  className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No matching skills found.</p>
          )}
        </div>

        {/* Missing Skills */}
        <div className="p-6 border border-red-400 rounded-lg bg-red-50">
          <h4 className="text-lg font-semibold mb-4 text-red-600">Missing Skills</h4>
          {missingSkills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {missingSkills.map((skill: string, index: number) => (
                <span
                  key={index}
                  className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No missing skills detected.</p>
          )}
        </div>
      </div>

      {/* Experience and Education Match */}
      <div className="mb-6">
        <p className="text-lg font-semibold mb-2">🧑‍💼 Experience Match</p>
        <p className="text-gray-700 bg-gray-100 p-4 rounded-lg">{experienceMatch}</p>
      </div>
      
      <div className="mb-6">
        <p className="text-lg font-semibold mb-2">🎓 Education Match</p>
        <p className="text-gray-700 bg-gray-100 p-4 rounded-lg">{educationMatch}</p>
      </div>

      {/* Analysis Section */}
      <div className="mb-6">
        <p className="text-lg font-semibold mb-2">📊 Analysis</p>
        <p className="text-gray-700 bg-gray-100 p-4 rounded-lg">{analysis}</p>
      </div>

      {/* Suggestions Section */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-blue-600">💡 Suggestions for Improvement</h4>
        {suggestions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {suggestions.map((suggestion: string, index: number) => (
              <div
                key={index}
                className="p-4 border border-blue-400 bg-blue-50 rounded-lg shadow-sm"
              >
                <p className="text-gray-700">{suggestion}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No suggestions available.</p>
        )}
      </div>

      {/* Reset Button */}
      <div className="text-center">
        <button
          onClick={onReset}
          className="bg-black text-white py-3 px-8 rounded-lg hover:bg-gray-800 transition"
        >
          Match Another Resume
        </button>
      </div>
    </section>
  );
}
